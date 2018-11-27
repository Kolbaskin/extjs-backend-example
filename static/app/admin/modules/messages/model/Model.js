Ext.define('Module.messages.model.Model', {
    extend: 'Core.data.DataModel'
    /* scope:server */
    ,async $newmessage(data) {
        const msg = {
            user: data.user,
            message: data.message
        }
        if(data.to && Ext.isArray(data.to) && data.to.length) {
            this.fireEvent('newmessage', data.to, msg);
        } else {
            this.fireEvent('newmessage', 'all', msg);
        }
        return true;        
    }
})