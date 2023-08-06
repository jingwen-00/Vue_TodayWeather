const setting = {
    state: {
        viewSize: "lg",
        isXS: false,
    },
    getters: {
        viewSize: state => state.viewSize,
        isXs: state => state.isXS,
    },
    mutations: {
        CHANGE_VIEW(state, param) {
            state.viewSize = param
        },
        IS_XS(state, param) {
            state.isXS = param
        }
    },
    actions: {
        ChangeViewSize(state, payload) {
           
            if (payload = window.innerWidth < 600){
                state.commit("CHANGE_VIEW", "xs");
                state.commit("IS_XS", true);
            }
            else if (payload = window.innerWidth < 960){
                state.commit("CHANGE_VIEW", "sm");
                state.commit("IS_XS", true);
            }
            else if (payload = window.innerWidth < 1264){
                state.commit("CHANGE_VIEW", "md");
                state.commit("IS_XS", false);
            }
            else if (payload = window.innerWidth < 1904){
                state.commit("CHANGE_VIEW", "lg");
                state.commit("IS_XS", false);
            } 
            else{
                state.commit("IS_XS", false);
                state.commit("CHANGE_VIEW", "xl");
            }              
        },
    }
};

export default setting;
