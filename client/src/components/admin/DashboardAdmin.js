import React, { Component } from 'react';
import { connect } from 'react-redux';

export class DashboardAdmin extends Component {
  render() {
    return <div>Admin Dashboard</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAdmin);
