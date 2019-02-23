import React, { Component } from "react";
import { HashRouter, Route, NavLink } from "react-router-dom";

import Styles from "./Home.less";
import Products from "./products/Products.jsx";
import Customers from "./customers/Customers.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";

export default class Home extends Component {
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
            <NavLink to="/home" className={Styles.menunavlink}>
              <li className={Styles.menulineitem}>
                <i className="fas fa-home" /> Home
              </li>
            </NavLink>
            <li className={Styles.menulineitem}>
              <i className="fas fa-shopping-cart" /> Sales
            </li>
            <NavLink to="/customers" className={Styles.menunavlink}>
              <li className={Styles.menulineitem}>
                <i className="fas fa-snowman" /> Customers
              </li>
            </NavLink>
            <NavLink to="/products" className={Styles.menunavlink}>
              <li className={Styles.menulineitem}>
                <i className="fas fa-database" /> Products
              </li>
            </NavLink>
            <li className={Styles.menulineitem}>
              <i className="fas fa-file-invoice-dollar" /> Purchases
            </li>
            <li className={Styles.menulineitem}>
              <i className="fas fa-user-tie" /> Vendors
            </li>
          </ul>
        </div>

        <div className={Styles.maincontent}>
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
          <div>
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/products" component={Products} />
          </div>
        </div>
      </div>
    );
  }
}
