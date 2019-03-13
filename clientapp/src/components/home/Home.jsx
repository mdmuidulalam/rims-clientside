import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import Styles from "./Home.less";
import Products from "./products/Products.jsx";
import Customers from "./customers/Customers.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Orders from "./orders/Orders.jsx";
import Purchases from "./purchases/Purchases.jsx";
import Vendors from "./vendors/Vendors.jsx";
import Accountings from "./accounting/Accountings.jsx";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* sidebar content */}
        <div className={Styles.sidebar}>
          <div className={Styles.sidebarheader}>
            <div className={Styles.headertext + " " + Styles.sidebarheadertext}>
              BASE
            </div>
          </div>
          <div className={Styles.userpanel}>
            <div id="name">Md Muidul Alam</div>
            <div>
              <i className="fa fa-circle text-success" /> Online
            </div>
          </div>
          <ul className={Styles.menu}>
            <li className={Styles.menubar}>MAIN NAVIGATION</li>
            <NavLink
              to={`${this.props.match.path}/dashboard`}
              className={Styles.menunavlink}
              activeClassName={Styles.menuactive}
            >
              <li className={Styles.menulineitem}>
                <i className="fas fa-chalkboard" /> Dashboard
              </li>
            </NavLink>
            <NavLink
              to={`${this.props.match.path}/orders`}
              className={Styles.menunavlink}
              activeClassName={Styles.menuactive}
            >
              <li className={Styles.menulineitem}>
                <i className="fas fa-shopping-cart" /> Orders
              </li>
            </NavLink>
            <NavLink
              to={`${this.props.match.path}/customers`}
              className={Styles.menunavlink}
              activeClassName={Styles.menuactive}
            >
              <li className={Styles.menulineitem}>
                <i className="fas fa-snowman" /> Customers
              </li>
            </NavLink>
            <NavLink
              to={`${this.props.match.path}/products`}
              className={Styles.menunavlink}
              activeClassName={Styles.menuactive}
            >
              <li className={Styles.menulineitem}>
                <i className="fas fa-database" /> Products
              </li>
            </NavLink>
            <NavLink
              to={`${this.props.match.path}/purchases`}
              className={Styles.menunavlink}
              activeClassName={Styles.menuactive}
            >
              <li className={Styles.menulineitem}>
                <i className="fas fa-file-invoice-dollar" /> Purchases
              </li>
            </NavLink>
            <NavLink
              to={`${this.props.match.path}/vendors`}
              className={Styles.menunavlink}
              activeClassName={Styles.menuactive}
            >
              <li className={Styles.menulineitem}>
                <i className="fas fa-user-tie" /> Vendors
              </li>
            </NavLink>
            <NavLink
              to={`${this.props.match.path}/accounting`}
              className={Styles.menunavlink}
              activeClassName={Styles.menuactive}
            >
              <li className={Styles.menulineitem}>
                <i class="fas fa-balance-scale" /> Accounting
              </li>
            </NavLink>
          </ul>
        </div>
        {/* header content */}
        <div className={Styles.maincontentandheader}>
          <div className={Styles.header + " row"}>
            <div className="col-lg-1 col-md-1 col-sm-1">
              <div className={Styles.menuminimize}>
                <i className="fas fa-bars" />
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-5">
              <div className={Styles.headertext}>BASE COMPANY LTD.</div>
            </div>
            <div className="col-lg-3 col-md-5 col-sm-4">
              <div className={Styles.searchbox}>
                <input
                  className={Styles.searchboxinput + " form-control"}
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          {/* main content */}
          <div className={Styles.maincontent}>
            <Route
              path={`${this.props.match.path}/dashboard`}
              component={Dashboard}
            />
            <Route
              path={`${this.props.match.path}/orders`}
              component={Orders}
            />
            <Route
              path={`${this.props.match.path}/customers`}
              component={Customers}
            />
            <Route
              path={`${this.props.match.path}/products`}
              component={Products}
            />
            <Route
              path={`${this.props.match.path}/purchases`}
              component={Purchases}
            />
            <Route
              path={`${this.props.match.path}/vendors`}
              component={Vendors}
            />
            <Route
              path={`${this.props.match.path}/accounting`}
              component={Accountings}
            />
          </div>
        </div>
      </div>
    );
  }
}
