/*! function() {
    var view = document.querySelector('section.messages')

    var controller = {
        view: null,
        messageList: null,
        init: function(view) {
            this.view = view
            this.messageList = view.querySelector('messageList')
            this.myMessage = view.querySelector('#myMessage')
            this.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        initAV: function() {
            AV.init({
                appId: "c5j0AyiKGrxw9FrQqgHNRbQv-gzGzoHsz",
                appKey: "1oql0m7T51qj6auOzs0RyP27",
                serverURLs: "https://c5j0ayik.lc-cn-n1-shared.com"
            })
        },
        loadMessages: function() {
            var query = new AV.Query('Message');
            query.find()
                .then(
                    (messages) => {
                        let array = messages.map((iterm) => iterm.attributes)
                        array.forEach((iterm) => {
                            let li = document.createElement('li')
                            li.innerText = iterm.name + '：' + iterm.content
                            this.messageList.appendChild(li)
                        });
                    },
                    function(error) {
                        console.log(error)
                    }).then(() => {}, (error) => {
                    console.log(error)
                })
        },
        bindEvents: function() {
            this.myMessage.addEventListener('submit', function(xx) {
                xx.preventDefault()
                this.postMessage()
            })
        },
        postMessage: function() {
            var myMessage = this.myMessage
            let content = myMessage.querySelector('input[name=content]').value
            let name = myMessage.querySelector('input[name=name]').value
            var Message = AV.Object.extend('Message');
            var Message = new Message();
            Message.set({
                'name': name,
                'content': content
            });
            Message.save().then(function(object) {
                let li = document.createElement('li')
                li.innerText = object.attributes.name + '：' + object.attributes.content
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                let content = myMessage.querySelector('input[name=content]').value = ''

                console.log('保存成功。 ')
            })
        }
    }
    controller.init(view)
}.call()*/
! function() {
    var view = document.querySelector('section.messages')

    var model = {
        // 获取数据
        init: function() {
            AV.init({
                appId: "c5j0AyiKGrxw9FrQqgHNRbQv-gzGzoHsz",
                appKey: "1oql0m7T51qj6auOzs0RyP27",
                serverURLs: "https://c5j0ayik.lc-cn-n1-shared.com"
            })
        },
        fetch: function() {
            var query = new AV.Query('Message');
            return query.find() // Promise 对象
        },
        // 创建数据
        save: function(name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({ // Promise 对象
                'name': name,
                'content': content
            })
        }
    }



    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function(view, model) {
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function() {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        bindEvents: function() {
            this.form.addEventListener('submit', function(e) {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function() {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function(object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        }

    }

    controller.init(view, model)


}.call()