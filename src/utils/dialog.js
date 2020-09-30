//  莫泰框数据
export const dialogData = {
    //  是否展示莫泰框
    visible: false,
    //  提交按钮loading
    submitLoading: false,
};

//  莫泰框方法
//  开启、关闭莫泰框
export const dialogMethods = {
    showModal(){
        this.dialogVisible = true;
    },
    hideModal(){
        this.dialogVisible = false;
    },
};