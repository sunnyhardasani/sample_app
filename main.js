/**
 *
 */

//define the main module having 3 dependencies: d3 (external library), caleydo main, and caleydo data
define(['d3', '../caleydo_core/main', '../caleydo_core/data'], function (d3, C, data) {
  'use strict';

  //list a available dataset as a table
  var base = d3.select('#datalist tbody');

  function renderTable(list) {
    //bind the data items to rows
    var rows = base.selectAll('tr').data(list);
    rows.enter().append('tr');
    rows.exit().remove();
    //create the cols
    var cols = rows.selectAll('td').data(function(d) {
      return [d.desc.id, d.desc.name, d.desc.type, d.dim];
    });

    cols.enter().append('td');
    cols.exit().remove();

    cols.html(function(d, i) {
      if (i === 0) { //== id so generate a link to it, too
        return '<a href="'+ C.server_url + '/dataset/' + d+'">'+ d + '</a>';
      } else if (i === 3) { //== size which is an array
        return d.join(' x ');
      }
      return d;
    });
  }

  //request a list of all available datasets
  //the functions returns a Promise (https://www.promisejs.org/)
  data.list().then(function(list) {
    //list an array of datatypes.IDataType compatible objects

    renderTable(list);
  });
});
