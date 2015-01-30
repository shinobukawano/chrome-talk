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

    connect: function() {
        var contact = this.getViewModel().get('contact');

        var result = contact.validate();

        if (result.length > 0) {
            Ext.Msg.alert(CT.Consts.APP_TITLE,
                          'The e-mail address seems invalid. <br>' +
                          'Please confirm it.');
            return;
        }

        var contacts = this.getStore('Contacts');
        contacts.add(contact);
        contacts.sync();

        var panel = this.lookupReference('displayPanel');
        panel.getEl().mask('Connecting..');

        var button = this.lookupReference('connectButton');
        button.setText(CT.Consts.BUTTON_DISCONNECT_TEXT);

    },

    disconnect: function() {
        var panel = this.lookupReference('displayPanel');
        panel.getEl().unmask();

        var button = this.lookupReference('connectButton');
        button.setText(CT.Consts.BUTTON_CONNECT_TEXT);
    },

    isConnecting: function() {
        var button = this.lookupReference('connectButton');
        return button.getText() === CT.Consts.BUTTON_DISCONNECT_TEXT;
    },

    onConnectButtonClick: function(button, e, eOpts) {
        var me = this;

        if (me.isConnecting()) {
            me.disconnect();
        }
        else {
            me.connect();
        }

    },

    onDeleteButtonClick: function(view, rowIndex, colIndex, item, e, record, row) {
        var me = this;

        Ext.Msg.confirm(CT.Consts.APP_TITLE,
        'Do you want to remove this contact?',
        function(btn) {
            if (btn === 'yes') {
                var contacts = me.getStore('Contacts');
                contacts.remove(record);
                contacts.sync();
            }
        });
    },

    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        viewModel.setData({
            contact: record
        });

    },

    onViewportAfterRender: function(component, eOpts) {

        var record = Ext.create('CT.model.Contact');

        var viewModel = this.getViewModel();
        viewModel.setData({
            contact: record
        });

    }

});
