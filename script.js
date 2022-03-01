$(document).ready(function(){

// ADDING A NEW ITEM TO THE LIST

  // Define the callback function
  var addItem = function() {
  
    var $ingredient = $('#add_ingredient').val();
    var $amount = $('#add_amount').val();
    var $type = $('#add_type').val();

    // If the input text field isn't empty, add it to the list as a new item
    if ($ingredient && $amount && $type) {
      var template = $( "#template li" );
      template.find('.ingredient').text($ingredient);
      template.find('.amount').text($amount);
      template.find('.type').text($type);

      template.clone().prependTo( ".list" );

      // $('.list').prepend('<li class="list__item"><a class="list__delete-btn">X</a>' + $ingredient + ' - ' + $amount + '<a class="list__check-btn">✔</a></li>');
      
      // Clear the input text field
      $('.submission-line__input').val("");
    }
  };

  // Add a new item to the list by clicking "Add" button
  $('.submission-line__btn.add').on('click', function(event){
    // (prevents form submit button unwanted default action)
    event.preventDefault();
    // run the callback function
    addItem();
  });

  // Add a new item to the list by hitting "Enter"
  $('.submission-line__input').keypress(function(event){
    if (event.which === 13) {
      // run the callback function
      addItem();
    }
  });

// DELETING AN ITEM FROM THE LIST

  // Clicking an item's delete button:
  $('.list').on('click', '.list__delete-btn', function(){
    // removes that item from the list

    $(this).parent().parent().fadeOut(300, function(){
      $(this).remove();
    });
  });

// CHECKING AN ITEM OFF FROM THE LIST

  // Clicking an item's check button:
  $('.list').on('click', '.list__check-btn', function(event){

    var $thisLine = $(this).parent().parent();
    var $ingredient = $thisLine.find('.ingredient').text();
    var $amount = $thisLine.find('.amount').text();
    var $type = $thisLine.find('.type').text();
    
    $("#add_ingredient").val($ingredient);
    $("#add_amount").val($amount);
    $("#add_type").val($type);

    $thisLine.fadeOut(300, function(){
      $(this).remove();
    });
  });

});


function save() {
  var opskrift = {
    opskrift: $('#opskrift_title').val(),
    count: $('#opskrift_count').val(),
    ingridients: [],
  };

  $(".list li").each(function( index ) {
    var $ingredient = $(this).find('.ingredient').text();
    var $amount = $(this).find('.amount').text();
    var $type = $(this).find('.type').text();

    console.log($ingredient);
    console.log($amount);
    console.log($type);

    opskrift.ingridients.push({
      ingredient: $ingredient,
      amount: $amount,
      type: $type
    });
    // console.log( index + ": " + $( this ).text() );
  });


  var encoded = btoa(JSON.stringify(opskrift))

  localStorage.setItem('myKey', JSON.stringify(opskrift));


}