import os


template = '''import React from 'react/addons';
let { TestUtils } = React.addons;

describe('%(filename)s', function() {
  it('should render', function() {
  });
});
'''


for dirpath, dirnames, filenames in os.walk('./test'):
    for filename in filenames:
        if '.js' not in filename:
            continue

        filename = filename.replace('.jsx', '')
        filename = filename.replace('.js', '')
        path = os.path.join(dirpath, filename).replace('./test', '.')
        print "import '%s';" % path
