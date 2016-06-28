
export default function validationConnector(action, validateCb) {
  return (dispatch, getState) => {
    return action((actionData) => {
      const {errors} = actionData;
      if(errors){
        errors.map((err) => {
          var e;
          try {
            e = JSON.parse(err.message)
          } catch (er) {
            console.log('error message is not in json format, skip it')
          }
          validateCb(e);
        })
      }
      dispatch(actionData);
    }, getState)
  }
}
