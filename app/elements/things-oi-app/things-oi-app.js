window.Things = window.Things||{};
window.Things.DataGlobal = window.Things.DataGlobal || {};
window.Things.DataGlobal.wip = window.Things.DataGlobal.wip || {};
window.Things.DataGlobal.qc = window.Things.DataGlobal.qc || {};
window.Things.DataGlobal.inv = window.Things.DataGlobal.inv || {};

Polymer({
    is: 'things-oi-app',
    properties:{
        selectedMenu : {
            type: Object
        },
        hideStep:{
            type: Number,
            value: 1
        }
    },
    behaviors:[
        Things.GlobalBehavior,
        Things.FullscreenBehavior
    ],
    ready:function(){
        //TODO : EVENT Manager로 수정 필요
        document.addEventListener('things-routing-changed', function(e) {
          this.selectedMenu = e.detail;
        }.bind(this));

        document.addEventListener('things-show-tost', function(e) {
            this.showToast(e.detail.msg);
        }.bind(this));
    },
    /**
     * drawer를 찾아서 toggle full screen
     */
    _fullScreenTap: function () {
        this.target = this.$.drawerArea;
        this.toggleFullscreen();
    },
    /**
     * fullscreen behavior의 _fullscreenChangedHandler overwrite
     */
    _fullscreenChangedHandler: function() {
        this._setFullscreen(this._isFullscreenToggled());
        this.$.appDrawer.opened= !this.fullscreen;
        this.$.drawerArea.forceNarrow = this.fullscreen;
        if(this.fullscreen){
            this.hideStep = 2;
            this._hideInfoContent(null);
        }else{
            this.hideStep = 3;
            this._hideInfoContent(null);
        }
    },
    /**
     * showToast 정보 보여 주기
     */
    showToast : function(msg){
        this.$.infoToast.text = msg;
        this.$.infoToast.show();
    },
    /**
     * Event를 통하여 showToast 정보 보여 주기
     */
    showToastInfo : function(e){
        this.$.infoToast.text = e.detail;
        this.$.infoToast.show();
    },
    /**
     * Event를 통하여 OK를 가진 showToast 정보 보여 주기
     */
    showToastConfim : function(e){
        this.$.confirmToast.text = e.detail;
        this.$.confirmToast.show();
    },
    /**
     * refresh-wip event 리스너
     */
    refreshWip: function(e) {
        this.$.wip.refresh();
        this.$['order-actual'].refresh();
    },
    /**
     * information container : Order Info/Routing Info
     * searchBar : Search Form --> Date/Order/Operation/Line Container
     * 위 두 Element Hide용
     */
    _hideInfoContent : function (e) {
        var informationContainer = document.getElementById('informationContainer');
        var searchBar =  document.getElementById('searchToolbar');
        if(informationContainer && searchBar)
        {
            if(this.hideStep==1){
                informationContainer.opened = false;
                this.hideStep =2;
            }else if(this.hideStep==2){
                informationContainer.opened = false;
                searchBar.opened = false;
                this.hideStep =3;
            }else if(this.hideStep==3){
                informationContainer.opened = true;
                searchBar.opened = true;
                this.hideStep=1;
            }
        }
    }
});

