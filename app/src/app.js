/** @jsx React.DOM */

var React = require('react');
window.React = require('react'); // We need react on the rootscope for devtools

var _ = require('underscore');

var Product = React.createClass({
  render: function() {
    return <li>{this.props.name}</li>
  }
});

var AppRoot = React.createClass({
  render: function () {
    
    var products = _(this.props.products).collect(function (product) {
      return <Product name={product.name} />
    });

    return (
      <ul>{products}</ul>
    );

  }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
React.renderComponent(<AppRoot products={PRODUCTS} />, document.getElementById('container'));
