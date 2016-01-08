import DialogStoreMixin from './DialogStoreMixin';
import DialogsMixin from './DialogsMixin';
import FormMixin from './FormMixin';
import CheckListStoreMixin from './CheckListStoreMixin';
import InstanceTabsMixin from './InstanceTabsMixin';
import StoreFormMixin from './StoreFormMixin';
import MousetrapMixin from './MousetrapMixin';
import StoreLoadingMixin from './StoreLoadingMixin';
import WaitForStoreMixin from './WaitForStoreMixin';
import StoreHelpersMixin from './StoreHelpersMixin';
import IsLoadingMixin from './IsLoadingMixin';

let Mixins = {};

Mixins.DialogsMixin = DialogsMixin;
Mixins.DialogStoreMixin = DialogStoreMixin;
Mixins.FormMixin = FormMixin;
Mixins.CheckListStoreMixin = CheckListStoreMixin;
Mixins.InstanceTabsMixin = InstanceTabsMixin;
Mixins.MousetrapMixin = MousetrapMixin;
Mixins.StoreFormMixin = StoreFormMixin;
Mixins.StoreLoadingMixin = StoreLoadingMixin;
Mixins.WaitForStoreMixin = WaitForStoreMixin;
Mixins.StoreHelpersMixin = StoreHelpersMixin;
Mixins.IsLoadingMixin = IsLoadingMixin;

export default Mixins;
