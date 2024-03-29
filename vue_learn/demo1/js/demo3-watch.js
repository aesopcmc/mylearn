/**
 * Created by Administrator on 2018/1/18.
 */

/*实例生命周期例子*/
var vm = new Vue({
    el:'#app-1',
    data:{
        firstName:'Foo',
        lastName:'Bar',
        fullName:'Foo bar',
    },
    watch:{
        firstName:function(val){
            this.fullName = val + ' ' + this.lastName
        },
        lastName:function(val){
            this.fullName = this.firstName + ' ' + val
        },
    }

});
var vm2 = new Vue({
    el:'#app-2',
    data:{
        firstName:'Foo',
        lastName:'Bar',
    },
    computed:{
        fullName:function(){
            return this.firstName+' ' +this.lastName;
        }
    }

});

var vm3 = new Vue({
    el:'#app-3',
    data:{
        firstName:'Foo',
        lastName:'Bar',
    },
    computed:{
        fullName:{
            get: function(){
                return this.firstName+' ' +this.lastName;
            },
            set:function(newValue){
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }

});

var watchExampleVM = new Vue({
    el:'#watch-example',
    data:{
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch:{
        question:function(newVal, odlVal){
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },
    methods:{
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        // 请参考：https://lodash.com/docs#debounce
        getAnswer: _.debounce(
            function () {
                if (this.question.indexOf('?') === -1) {
                    this.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                this.answer = 'Thinking...'
                var vm = this
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // 这是我们为判定用户停止输入等待的毫秒数
            500
        )
    }
});

