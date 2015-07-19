import ButtonActionMixin from './ButtonActionMixin';
import DialogMixin from './DialogMixin';
import DialogsMixin from './DialogsMixin';
import FormMixin from './FormMixin';
import CheckListStoreMixin from './CheckListStoreMixin';
import InstanceTabsMixin from './InstanceTabsMixin';
import StoreFormMixin from './StoreFormMixin';
import StoreLoadingMixin from './StoreLoadingMixin';
import WaitForStoreMixin from './WaitForStoreMixin';

let Mixins = {};
Mixins.ButtonAction = ButtonActionMixin;
Mixins.Dialog = DialogMixin;
Mixins.Dialogs = DialogsMixin;
Mixins.Form = FormMixin;
Mixins.CheckListStore = CheckListStoreMixin;
Mixins.InstanceTabs = InstanceTabsMixin;
Mixins.StoreForm = StoreFormMixin;
Mixins.StoreLoading = StoreLoadingMixin;
Mixins.WaitForStore = WaitForStoreMixin;

export default Mixins;
