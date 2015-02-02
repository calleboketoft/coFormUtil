angular.module('coFormUtil')

.directive('coValidationMessages', function(coUtil) {
    return {
        restrict: 'A',
        compile: function(tElem, attrs) {

            var formName = coUtil.getClosestParentElem(tElem, 'form').attr('name');
            var inputName = tElem.find('input').attr('name') || tElem.find('textarea').attr('name');
            var patternMsg = '';
            if (tElem.find('input').attr('ng-pattern') || tElem.find('textarea').attr('data-ng-pattern')) {
                patternMsg = [
                    '<div ng-message="pattern" class="alert alert-danger">',
                        '<span>' + attrs.patternTranslation + '</span>',
                    '</div>'
                ].join('');
            }
            var appendTo = tElem;
            appendTo.append([
                '<span class="form-warning" ',
                    'ng-messages="' + formName + '.' + inputName + '.$error" ',
                    'ng-messages-include="bower_components/coFormUtil/coCommonValidationTemplate.html">',
                    patternMsg,
                '</span>'
            ].join(''));
        }
    };
});
