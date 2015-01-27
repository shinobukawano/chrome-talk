/*
 * File: app/view/MyViewport.js
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

Ext.define('CT.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',

    requires: [
        'CT.view.MyViewportViewModel',
        'CT.view.MyViewportViewController',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.panel.Tool'
    ],

    controller: 'myviewport',
    viewModel: {
        type: 'myviewport'
    },
    layout: 'fit',

    items: [
        {
            xtype: 'panel',
            layout: 'border',
            title: 'CHROME TALK <i class="fa fa-comments"></i>',
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    region: 'center',
                    cls: 'display-panel',
                    id: 'displayPanel'
                },
                {
                    xtype: 'form',
                    flex: 1,
                    region: 'south',
                    split: true,
                    height: 150,
                    id: 'contactPanel',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            reference: 'accountField',
                            margin: '10em',
                            fieldLabel: '<i class="fa fa-search"></i> Google Account',
                            labelWidth: 135,
                            emptyText: 'example@gmail.com',
                            bind: {
                                value: '{contact.address}'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'connectButton',
                                    margin: '0 10em 10em',
                                    text: '<i class="fa fa-video-camera"></i> CONNECT',
                                    bind: {
                                        disabled: '{!contact.address}'
                                    },
                                    listeners: {
                                        click: 'onConnectButtonClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '10em',
                            minHeight: 100,
                            title: '<i class="fa fa-list-alt"></i> CONTACTS',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    margin: '10em',
                                    minHeight: 100,
                                    title: '',
                                    hideHeaders: true,
                                    store: 'Contacts',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'address',
                                            text: 'String',
                                            flex: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'tool'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onViewportAfterRender'
    }

});