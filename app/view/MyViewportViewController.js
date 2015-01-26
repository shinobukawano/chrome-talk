/*
 * File: app/view/MyViewportViewController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CT.view.MyViewportViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myviewport',

    onConnectButtonClick: function(button, e, eOpts) {
        var field = this.lookupReference('accountField'),
            value = field.getValue();

        if (!field.isValid()) {
            Ext.Msg.alert(CT.Consts.APP_TITLE,
            'The account value seems invalid. <br>' +
            'Please confirm it.');
        }



    },

    onViewportAfterRender: function(component, eOpts) {

        var record = Ext.create('CT.model.Contact');

        var viewModel = this.getViewModel();
        viewModel.setData({
            contact: record
        });

    }

});
