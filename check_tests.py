import os
import sys

MAIN_PATH = 'src'
SUFFIX = ('.js', '.jsx')
excluded_dirs = ('__tests__',)

file_template = """jest.dontMock("../%(code_file)s");

describe("%(code_file)s", function() {
  it("testing component", function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var %(class_name)s = require('../%(code_file)s');
  });
});"""

def create_test_file(test_path, code_file):
    cf = code_file.replace('.jsx', '')
    class_name = cf.replace('.react', '')
    directory = os.path.dirname(test_path)
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
        test_file = open(test_path, 'w+')
        test_file.write(file_template % {'code_file': cf, 'class_name': class_name})
        test_file.close()
    except Exception as e:
        print e.message
        print "Can't create a file: %s!" % test_path
        sys.exit(1)

    print "File created!"

def check_tests(files):
    for file_path in files:
        full_path = os.path.join(os.path.realpath('.'), file_path) # Real path
        directory, filename = full_path.rsplit('/', 1) # File directory and file full name

        filename_name, filename_suffix = filename.rsplit('.', 1)
        filename_suffix = 'js' # Tests are always in JS

        test_name = '%s.test.%s' % (filename_name, filename_suffix)
        test_full_path = os.path.join(os.path.realpath('.'), directory, '__tests__', test_name)

        if not os.path.exists(test_full_path):
            print "No test file for: %s" % test_full_path
            create_test_file(test_full_path, filename)

def find_files(path):
    for root, dirnames, filenames in os.walk(path):
        # Only from dirs which aren't excluded
        if not any(map(root.__contains__, excluded_dirs)):
            for filename in filenames:
                # Only certain suffixes
                if filename.endswith(SUFFIX):
                    yield os.path.join(root, filename)

# Searching for "testable" files, checking if files exist, creating files in case they're not exist
check_tests(find_files(MAIN_PATH))
