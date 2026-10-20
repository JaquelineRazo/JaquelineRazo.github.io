/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/

	function ContactForm() {

		// The form now posts natively to a third-party static-form backend
		// (see contact.html's form action) instead of the old contact.php
		// AJAX endpoint, so this no longer intercepts submission — the
		// browser handles the POST and redirect on its own.
		if( $('#contact-formular').length > 0 ){
			$('#submit').removeAttr('disabled');
		}

	}//End ContactForm
