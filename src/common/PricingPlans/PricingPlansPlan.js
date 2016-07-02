import React from 'react';
import _ from 'lodash';
import { Paper, Subheader, SelectField, List, ListItem, MenuItem, RaisedButton } from 'material-ui';
import numeral from 'numeral';

const PricingPlansPlan = React.createClass({
  displayName: 'PricingPlansPlan',

  getInitialState() {
    return {
      apiCalls: this.props.apiCallsOptions[0],
      scripts: this.props.scriptsOptions[0]
    };
  },

  getStyles() {
    return {
      pricingPlansPlan: {},
      pricingPlansPlanCurrent: {
        backgroundColor: 'rgb(252, 252, 252)'
      },
      pricingPlansPlanDisabled: {},
      subheader: {
        textAlign: 'center',
        padding: 0,
        borderBottom: 'solid 1px rgba(0, 0, 0, 0.117647)',
        fontWeight: 700
      },
      price: {
        fontWeight: 700,
        color: '#333A42',
        fontSize: 48,
        textAlign: 'center',
        textTransform: 'uppercase',
        lineHeight: 1
      },
      period: {
        fontSize: 18,
        fontWeight: 500,
        color: '#757E88',
        textAlign: 'center'
      },
      includes: {
        padding: 0,
        lineHeight: 1,
        marginTop: 24,
        marginBottom: 12
      },
      button: {
        width: '100%',
        height: 44,
        marginTop: 24
      },
      listItemInnerDiv: {
        paddingLeft: 48
      },
      listItemIcon: {
        width: 'auto',
        height: 'auto',
        margin: 0,
        top: '50%',
        left: 16,
        transform: 'translateY(-50%)'
      }
    };
  },

  handleSelectChange(event, field, value) {
    this.setState({ [field]: value });
  },

  formatSelectLabel(field, option) {
    const label = {
      apiCalls: 'API calls',
      scripts: 'Script seconds'
    };

    return `
      ${_.toUpper(numeral(option.included).format('0 a'))}
      ${label[field]}
      ${option.price > 0 ? `- $${option.price}` : ''}
    `;
  },

  renderPrice() {
    const styles = this.getStyles();
    const { apiCalls, scripts } = this.state;
    const { price } = this.props;
    const value = apiCalls.price + scripts.price;

    if (price) {
      return (
        <div style={styles.price}>
          {price}
        </div>
      );
    }

    return (
      <div style={styles.price}>
        <span style={{ fontSize: 24 }}>
          &#36;
        </span>
        {value}
      </div>
    );
  },

  renderSelect(field) {
    const { apiCallsOptions, scriptsOptions } = this.props;
    const options = {
      apiCalls: apiCallsOptions,
      scripts: scriptsOptions
    };
    const count = options[field].length;

    return (
      <SelectField
        key={field}
        value={this.state[field]}
        onChange={(event, index, value) => this.handleSelectChange(event, field, value)}
        disabled={count < 2}
      >
        {_.map(options[field], (option) => {
          return (
            <MenuItem
              key={option.price}
              value={option}
              primaryText={this.formatSelectLabel(field, option)}
            />
          );
        })}
      </SelectField>
    );
  },

  renderFeatures() {
    const styles = this.getStyles();
    const { features } = this.props;

    return (
      <List>
        {features.map((feature) => (
          <ListItem
            key={_.kebabCase(feature)}
            primaryText={feature}
            innerDivStyle={styles.listItemInnerDiv}
            leftIcon={
              <img
                src={require('!file-loader!./images/check.svg')}
                alt="check icon"
                style={styles.listItemIcon}
              />
            }
          />
        ))}
      </List>
    );
  },

  render() {
    const styles = this.getStyles();
    const { title, period, highlighted, disabled } = this.props;

    if (highlighted) {
      _.assign(styles.pricingPlansPlan, styles.pricingPlansPlanCurrent);
    }

    if (disabled) {
      _.assign(styles.pricingPlansPlan, styles.pricingPlansPlanDisabled);
    }

    return (
      <div className="col-flex-1">
        <Paper
          zDepth={highlighted ? 2 : 1}
          style={styles.pricingPlansPlan}
        >
          <Subheader style={styles.subheader}>
            {title}
          </Subheader>
          <div style={{ padding: 16 }}>
            {this.renderPrice()}
            <div style={styles.period}>
              {period}
            </div>
            <Subheader style={styles.includes}>
              Includes:
            </Subheader>
            {this.renderSelect('apiCalls')}
            {this.renderSelect('scripts')}
            <RaisedButton
              label="Buy"
              backgroundColor="#FFCC01"
              labelStyle={{ fontWeight: 700, color: '#1D2228' }}
              style={styles.button}
            />
          </div>
          {this.renderFeatures()}
        </Paper>
      </div>
    );
  }
});

PricingPlansPlan.contextTypes = {
  currentPlanLimits: React.PropTypes.object
};

export default PricingPlansPlan;
