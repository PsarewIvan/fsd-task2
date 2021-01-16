export interface IModelSettings {
  min: Number;
  max: Number;
  value: Number;
  onChange?: Function;
  onFinish?: Function;
}

export interface IUserSettings {
  min?: Number;
  max?: Number;
  value?: Number;
  onChange?: Function;
  onFinish?: Function;
}
