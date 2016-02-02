/**
 * Created by chaika on 25.01.16.
 */
$(function(){
    $('.btn').click(function(){
        alert("Button: " + $(this).text());
        return false;
    });
});