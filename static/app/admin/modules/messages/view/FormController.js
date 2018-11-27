Ext.define('Module.messages.view.FormController', {
    extend: 'Ext.app.ViewController'
    
    ,init(view) {        
        this.view = view;
        // Создаем инстанс модели данных
        this.model = Ext.create('Module.messages.model.Model');
        // ссылка на поле ввода текста
        this.msgEl = this.view.down('[name=message]');
        // ссылка на таблицу пользователей
        this.usersGrid = Ext.getCmp('users-grid')
        // обработчик нажатия кнопки "отправить"
        this.control({
            '[action=submit]'    : {click: () => {this.newMessage() }}            
        })        
    }

    // Готовим и отправляем сообщения
    ,newMessage() {
        let users = [];
        // читаем идентификаторы отмеченных пользователей
        const sel = this.usersGrid.getSelection();
        if(sel && sel.length) {
            sel.forEach((s) => {
                users.push(s.data.id)
            })
        }
        // добавляем свой идентификатор если он не отмечен
        if(users.length && users.indexOf(Ext.WS.token) == -1)
            users.push(Ext.WS.token);

        // Вызываем серверный метод для отправки сообщения
        this.model.$newmessage({
            to: users,
            user: Ext.WS.user,
            message: this.msgEl.getValue()
        })
        // очищаем поле ввода
        this.msgEl.setValue('');        
    }    
});