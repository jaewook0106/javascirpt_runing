UPDATE_SOCKET_BOARD_DEVICE_LIST(state, payload) { 
  // 수정
  if(payload) {
    const data = [];
    state.boardDeviceList.forEach( item => {
      payload.forEach( payloadItem => {
        if(item.seq === payloadItem.seq) {
          item = {...item, ...payloadItem}
        }  
      })
      data.push(item)
    })
    state.boardDeviceList = data;
  }
     
},
DELETE_SOCKET_BOARD_DEVICE_LIST(state, payload) {
  if(payload) {
    const data = state.boardDeviceList.filter(item => {
      return !payload.find(deleteItem => deleteItem.seq === item.seq);
    });
    state.boardDeviceList = data;
  }
},
ADD_SOCKET_BOARD_DEVICE_LIST(state, payload) {
  if(payload) {
    state.boardDeviceList = [...payload, ...state.boardDeviceList];
  }
}