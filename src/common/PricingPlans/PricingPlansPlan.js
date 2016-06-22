import React from 'react';
import _ from 'lodash';
import { Paper, Subheader, SelectField, List, ListItem, MenuItem, RaisedButton } from 'material-ui';
import numeral from 'numeral';

export default React.createClass({
  displayName: 'PricingPlansPlan',

  getInitialState() {
    return {
      apiCalls: this.props.apiCallsOptions[0],
      scripts: this.props.scriptsOptions[0],
      selectValues: {
        apiCalls: 'start',
        scripts: 'start'
      }
    };
  },

  getStyles() {
    return {
      pricingPlansPlan: {
        flex: '0 0 calc(100%/3 - 24px)',
        margin: '0 12px'
      },
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
    const parsedValue = JSON.parse(value);

    this.setState({ [field]: parsedValue });
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
    const { selectValues } = this.state;
    const { apiCallsOptions, scriptsOptions } = this.props;
    const options = {
      apiCalls: apiCallsOptions,
      scripts: scriptsOptions
    };
    const label = {
      apiCalls: 'API calls',
      scripts: 'Script seconds'
    };
    const count = options[field].length;

    return (
      <SelectField
        key={field}
        fullWidth={true}
        value={selectValues[field]}
        onChange={(event, index, value) => this.handleSelectChange(event, field, value)}
        disabled={count < 2}
      >
        {_.map(options[field], (option) => {
          return (
            <MenuItem
              key={option.price}
              value={JSON.stringify(option)}
              primaryText={`
                ${_.toUpper(numeral(option.included).format('0 a'))}
                ${label[field]}
                ${option.price > 0 && `- $${option.price}`}
              `}
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
    const { title, period } = this.props;

    return (
      <Paper style={styles.pricingPlansPlan}>
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
    );
  }
});
