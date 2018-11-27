Ext.define('Base.wsClient', {
    extend: 'Core.WsClient'

    // одного экземпляра модели вполне достаточно
    ,usersModel: Ext.create('Module.users.model.UserModel')

    // метод вызывается после успешной установки соединения
    ,async onStart() {
        // вызываем событие "add" для всех клиентов
        this.usersModel.fireEvent('add', 'all', [{id: this.token, name: this.req.query.user}])
        await this.setMemKey(`client:${this.token}`, this.req.query.user || '');
        await this.queueProcess(`client:${this.token}`, async (data, done) => {
            const res = await this.prepareClientEvents(data);
            done(res);
        })
    }

    // метод вызывается при обрыве соединения
    ,onClose() {
        // вызываем событие "remove" для всех клиентов
        this.usersModel.fireEvent('remove', 'all', [{id: this.token, name: this.req.query.user}])
        this.callParent(arguments);
    }
})