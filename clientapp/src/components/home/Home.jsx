import React, { Component } from "react";
import { HashRouter, Route, NavLink } from "react-router-dom";

import Styles from "./Home.less";
import Products from "./products/Products.jsx";
import Customers from "./customers/Customers.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";

export default class Home extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* sidebar content */}
          <div className={Styles.sidebar}>
            <div className={Styles.sidebarheader}>
              <div
                className={Styles.headertext + " " + Styles.sidebarheadertext}
              >
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
              <li className={Styles.menulineitem}>
                <NavLink to="/" className={Styles.menunavlink}>
                  <i className="fas fa-home" /> Home
                </NavLink>
              </li>
              <li className={Styles.menulineitem}>
                <i className="fas fa-shopping-cart" /> Sales
              </li>
              <li className={Styles.menulineitem}>
                <NavLink to="/customers" className={Styles.menunavlink}>
                  <i className="fas fa-snowman" /> Customers
                </NavLink>
              </li>
              <li className={Styles.menulineitem}>
                <NavLink to="/products" className={Styles.menunavlink}>
                  <i className="fas fa-database" /> Products
                </NavLink>
              </li>
              <li className={Styles.menulineitem}>
                <i className="fas fa-file-invoice-dollar" /> Purchases
              </li>
              <li className={Styles.menulineitem}>
                <i className="fas fa-user-tie" /> Vendors
              </li>
            </ul>
          </div>
          {/* main content */}
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
            <div>
              <Route exact path="/" component={Dashboard} />
              <Route path="/customers" component={Customers} />
              <Route path="/products" component={Products} />
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
