jQuery(function() {
//----------------------------------------------------
// Reservation Form 
//----------------------------------------------------
//
    var resetForm=function(jqForm){

        jqForm.find(':input')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
    }
	if($("#dtBox").size()>0){
			   $("#dtBox").DateTimePicker({
	   		dateTimeFormat:"yyyy-MM-dd HH:mm:ss",
	   		shortDayNames:['周日','周一','周二','周三','周四','周五','周六'],
	   		shortMonthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
	   		fullMonthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
	   		titleContentDate:'设置日期',
	   		titleContentTime:'设置时间',
	   		titleContentDateTime:'选择日期时间',
	   		setButtonContent:'设置',
	   		clearButtonContent:'清除'

	   });
	}


    jQuery('#main input#submit').on("click",function(e) { 
		e.preventDefault();
		var res_name = $.trim(jQuery('input#name').val());
		var res_email = $.trim(jQuery('input#email').val());
		var res_message = $.trim(jQuery('textarea#message').val());
		var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
		var number_validate =  new RegExp( /^[0-9-+]+$/ );
		var res_persons = $.trim(jQuery('input#num').val());
		var mobile = $.trim(jQuery('input#mobile').val());
		var res_datetime = $.trim(jQuery('input#datetime').val());
		var hasError = false;
		if(res_name=='')
		{
			jQuery('[name="name"]').addClass('vaidate_error');
			hasError = true;
		}else{
			jQuery('[name="name"]').removeClass('vaidate_error');
		}
		if(res_email=='')
		{
			jQuery('[name="email"]').addClass('vaidate_error');
			hasError = true;
		}else{
		if (!pattern.test(res_email)) {
			jQuery('[name="email"]').addClass('vaidate_error');
			hasError = true;
		}else{
			jQuery('[name="email"]').removeClass('vaidate_error');
		}
		}
		
		if(res_datetime=="" || isNaN(Date.parse(res_datetime)))
		 {

			 $("#datetime").addClass('vaidate_error');
			 hasError = true;
		 }else{
			 $("#datetime").removeClass('vaidate_error');
			 }
		
		if(mobile=="")
		 {
			 jQuery('[name="mobile"]').addClass('vaidate_error');
			 hasError = true;
		 }else{
		 	if( !/^1[3|5|8|7]\d{9}$/.test(mobile) ){
		 		jQuery('[name="mobile"]').addClass('vaidate_error');
		 	}else{
		 		jQuery('[name="mobile"]').removeClass('vaidate_error');
		 	}
			 }
		if(res_persons=="")
		 {
			 jQuery('[name="num"]').addClass('vaidate_error');
			 hasError = true;
		 }else{
		 	if( !number_validate.test(res_persons) ){
		 		jQuery('[name="num"]').addClass('vaidate_error');
		 	}else{
			 jQuery('[name="num"]').removeClass('vaidate_error');
			 }	
			 }					 
		if(res_message=="")
		 {
			 jQuery('[name="message"]').addClass('vaidate_error');
			 hasError = true;
		 }else{
			 jQuery('[name="message"]').removeClass('vaidate_error');
			 }
 		 
		if(hasError) { return; }
		else {	
			jQuery.post('book.php',$("#contact-form").serialize(),
				function(results) {
                    var data= $.parseJSON(results);
                    if(data.code==1)
                    {
                        resetForm($("#contact-form"));
                        jQuery('div#response').html("预订成功").css({'color':'#393'}).slideDown('fast',function(){

                            setTimeout(function(){jQuery('div#response').slideUp('fast')},3000);
                        });
                    }

				}
			); // end ajax
		}
		});

//----------------------------------------------------
// Contact Form 
//----------------------------------------------------
    jQuery('#main input#contact_submit').live("click",function(e) { 
		    e.preventDefault();
		var name = jQuery('input#name').val();
		var email = jQuery('input#email').val();
		var message = jQuery('textarea#message').val();
		var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
		var siteemail = jQuery('input#siteemail').val();
		var mobile=$.trim($('#mobile'));
		var hasError = false;
		 if(name=='')
		 {
			 jQuery('[name="name"]').addClass('vaidate_error');
			 hasError = true;
		 }else{
			 jQuery('[name="name"]').removeClass('vaidate_error');
			 }
			 
		if(email=='')
		 {
			 jQuery('[name="email"]').addClass('vaidate_error');
			 hasError = true;
		 }else{
			if (!pattern.test(email)) {
				jQuery('[name="email"]').addClass('vaidate_error');
				 hasError = true;
			 }else{
				 jQuery('[name="email"]').removeClass('vaidate_error');
				 }
			 }
		if(mobile || !/^1[3|5|8|7]\d{9}$/.test(mobile)){

 			jQuery('[name="mobile"]').addClass('vaidate_error');
				 hasError = true;
		}
		else {

			 jQuery('[name="mobile"]').removeClass('vaidate_error');
		}
		if(message=="")
			 {
				 jQuery('[name="message"]').addClass('vaidate_error');
				 hasError = true;
			 }else{
				 jQuery('[name="message"]').removeClass('vaidate_error');
			}
		
        if(hasError) { return; }
		else {		
				jQuery.ajax({
		            type: 'post',
		          	 url: 'sendEmail.php',
		            data: 'name=' + name + '&email=' + email +'&subject='+ subject +'&message=' + message,

		            success: function(results) {	
		                jQuery('div#contact_response').html(results).css('display', 'block');		
		   
		         }
		     }); // end ajax
		}
    });

});