angular.module('coFormUtil')

.directive('coSubmitButtons', function(coUtil) {
    return {
        restrict: 'A',
        compile: function(tElem, tAttrs) {
            coUtil.getAllFormEls(tElem).forEach(function(currentEl) {
                var closestForm = coUtil.getClosestParentElem(tElem, 'form');

                if (closestForm && (currentEl.type === 'submit' || currentEl.name.indexOf('submit') !== -1)) {
                    var formName = closestForm.attr('name');
                    coUtil.addOrConditionToAttribute(currentEl, 'ng-disabled', formName + '.$invalid');
                    if (tAttrs.coSubmitButtons !== 'enabledPristine') {
                        coUtil.addOrConditionToAttribute(currentEl, 'ng-disabled', formName + '.$pristine');
                    }
                }
            });
        }
    };
});
