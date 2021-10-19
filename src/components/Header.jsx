import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, totalField } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <span>
          Email:
          <span data-testid="email-field">
            { email }
          </span>
        </span>
        <span>
          --- Despesa Total:
          <span data-testid="total-field">
            { totalField }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalField: PropTypes.string.isRequired,
};

const calculateTotalExpense = (expenses) => {
  let total = 0;
  expenses.forEach(({ value, currency, exchangeRates }) => {
    const exchangeRate = parseFloat(exchangeRates[currency].ask);
    const convertedValue = parseFloat(value) * exchangeRate;
    total += convertedValue;
  });
  return total.toFixed(2);
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalField: calculateTotalExpense(state.wallet.expenses),
});

export default connect(mapStateToProps)(Header);
