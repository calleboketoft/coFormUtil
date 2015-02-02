angular.module('coFormUtil')
.directive('coIgnoredInput', function(){
    return {
        restrict : 'A',
        require : ['^form', 'ngModel'],
        link: function(scope, elem, attrs, ctrls) {
			ctrls[0].$removeControl(ctrls[1]);

            // The form doesn't trigger dirty if an input is not $pristine before editing of it starts
            ctrls[1].$pristine = false;
        }
    };
});
