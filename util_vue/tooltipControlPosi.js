import { mapActions, mapGetters } from 'vuex';
import { EventBus } from '@/plugins/eventBus';

const tooltipControlMixin = {
  data() {
    return {
      isOpen: false,
      isDownPosi: false,
      defaultHeightNum: 300
    }
  },
  computed: {
    ...mapGetters('layout', ['getContentDom'])
  },
  mounted() {
    EventBus.$on("close:Tooltip", this.closeTooltip);
    
  },
  methods: {
    tooltipControl(index) {
      this.getTooltipPosi(index);

      if(!this.isOpen) {
        this.openTooltip();
      } else {
        this.closeTooltip();
      }
    },
    emitCloseTooltip(){
      EventBus.$emit("close:Tooltip");
    },
    openTooltip() {
      this.emitCloseTooltip();
      window.addEventListener('click', this.emitCloseTooltip);
      this.isOpen = true;
    },
    closeTooltip() {
      window.removeEventListener('click', this.emitCloseTooltip);
      this.isOpen = false;
    },
    getTooltipPosi(index) {
      let rect;
      if(Array.isArray(this.$refs.tooltipPosiEl)) {
        rect = this.$refs.tooltipPosiEl[index].getBoundingClientRect().top;
      } else {
        rect = this.$refs.tooltipPosiEl.getBoundingClientRect().top;
      }
      // const rect = this.$refs.tooltipPosiEl.getBoundingClientRect().top;
      const scrollTop = window.pageYOffset;
      const smartContentHeight = this.getSmartContentDom.offsetHeight;
      if((smartContentHeight - this.defaultHeightNum) < (rect + scrollTop)){
        this.isDownPosi = true;
      }
    }
  },
}

export default tooltipControlMixin;