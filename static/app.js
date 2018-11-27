// определим нэймспэйсы
Ext.Loader.setConfig({
    enabled: true,    
    paths: {
        "Core": "app/core",
        "Admin": "app/admin",
        "Module": "app/admin/modules",
        "Ext.ux": "ext/ux" 
    }
});

// Генерация токена сессии
this.token = Ext.data.identifier.Uuid.createRandom()();

// Подключаемся к серверу по вебсокету
// передаем токен сессии (обязательно) 
// и имя пользователя (опционально для этого проекта)
Ext.WS = Ext.create('Core.WSocket', {
    token: this.token,
    user: new URLSearchParams(document.location.search).get("name")
});

// Инициализируем приложение
Ext.application({
    name: 'Example',
    extend: 'Ext.app.Application',
    requires: ['Admin.*'],
    autoCreateViewport: 'Admin.view.Viewport'    
})