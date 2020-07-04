function checkTaskType (prevType, prevStatus, newType, newStatus) {

  console.log(prevType, prevStatus, newType, newStatus);

  // changed only from main to secondary or vice versa
  if(newType && !newStatus) {
    if(prevType === 'secondary' && newType === 'main' && prevStatus === 'completed') {
      return +3
    }
    else if(prevType === 'main' && newType === 'secondary' && prevStatus === 'completed') {
      return -3
    }
  }
  
  // changed only from completed to not finished or vice versa
  else if(newStatus && !newType){
    if(prevStatus === 'completed' && newStatus === 'not finished' && prevType === 'secondary') {
      return -1
    }
    else if(prevStatus === 'not finished' && newStatus === 'completed' && prevType === 'secondary') {
      return +1
    }

    else if(prevStatus === 'completed' && newStatus === 'not finished' && prevType === 'main') {
      return -4
    }
    else if(prevStatus === 'not finished' && newStatus === 'completed' && prevType === 'main') {
      return +4
    }
  }

  else {
    return 0
  }
}

module.exports = checkTaskType