/**
 * Created by Zimme on 13.02.2016.
 */
function validateForm(field){
    var id = field.attr('id');
    var val = field.val();
    var parent = field.parent().parent();
    switch (id) {
        case 'inputName':
            if(val.match(/\d+/g) || val.length === 0) {
                $('form .name-help-block').fadeIn();
                parent.removeClass('has-success').addClass('has-error');
                return false;
            } else {
                $('form .name-help-block').fadeOut();
                parent.addClass('has-success').removeClass('has-error');
            }
            break;
        case 'inputPhone':
            if(!val.match(/^(\+38)?0\d{9}$/)){
                $('form .phone-help-block').fadeIn();
                parent.removeClass('has-success').addClass('has-error');
                return false;
            } else {
                $('form .phone-help-block').fadeOut();
                parent.addClass('has-success').removeClass('has-error');
            }
            break;
        case 'inputAddress':
            if(val.length === 0){
                $('form .address-help-block').fadeIn();
                parent.removeClass('has-success').addClass('has-error');
                return false;
            } else {
                $('form .address-help-block').fadeOut();
                parent.addClass('has-success').removeClass('has-error');
            }
            break;
    }
    return true;
}

exports.validateForm = validateForm;