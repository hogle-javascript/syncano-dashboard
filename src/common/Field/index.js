import Field from './Field.react';
import FieldDatetime from './FieldDatetime.react';
import FieldList from './FieldList.react';
import FieldPassword from './FieldPassword.react';
import FieldReadonly from './FieldReadonly.react';
import FieldSelect from './FieldSelect.react';
import FieldSelectOption from './FieldSelectOption.react';

Field.Datetime     = FieldDatetime;
Field.List         = FieldList;
Field.Password     = FieldPassword;
Field.Readonly     = FieldReadonly;
Field.Select       = FieldSelect;
Field.SelectOption = FieldSelectOption;

export default Field;
