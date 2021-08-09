function successMsg(msg){
	$.toast({ 
			  heading: 'Success',
			  text : '<strong>'+msg+'</strong>',// It can be plain, fade or slide
			  showHideTransition: 'slide',
			  bgColor : '#3c763d',              // Background color for toast
			  textColor : '#eee',            // text color
			  allowToastClose : true,       // Show the close button or not           // `false` to make it sticky or time in miliseconds to hide after
			  stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
			  textAlign : 'left',            // Alignment of text i.e. left, right, center
			  position : 'top-right',
			  icon:'success',       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
			  loader:false,
			  hideAfter:4000
		});
}
function failMsg(msg){
	$.toast({ 
			  heading: 'Failure',
			  text : '<strong>'+msg+'</strong>',// It can be plain, fade or slide
			  showHideTransition: 'slide',
			  bgColor : '#a94442',              // Background color for toast
			  textColor : '#eee',            // text color
			  allowToastClose : true,       // Show the close button or not           // `false` to make it sticky or time in miliseconds to hide after
			  stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
			  textAlign : 'left',            // Alignment of text i.e. left, right, center
			  position : 'top-right',
			  icon:'error',       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
			  loader:false,
			  hideAfter:4000
		});
}
function infoMsg(msg){
	$.toast({ 
			  heading: 'Information',
			  text : '<strong>'+msg+'</strong>',// It can be plain, fade or slide
			  showHideTransition: 'slide',
			  bgColor : '#31708f',              // Background color for toast
			  textColor : '#eee',            // text color
			  allowToastClose : true,       // Show the close button or not           // `false` to make it sticky or time in miliseconds to hide after
			  stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
			  textAlign : 'left',            // Alignment of text i.e. left, right, center
			  position : 'top-right',
			  icon:'info',       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
			  loader:false,
			  hideAfter:4000
		});
}	
