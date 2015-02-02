angular.module('coFormUtil')

.directive('coIndicateSaving', function(coUtil, usSpinnerService) {
    var spinnerKeyPrefix = 'save-indication-spinner-';

    return {
        restrict: 'A',
		require: '^form',
        compile: function(tElem, tAttrs) {
            coUtil.getAllFormEls(tElem).forEach(function(currentEl) {
                // Use OR conditional ng-disabled since form elements can be disabled and enabled for other reasons than this
                coUtil.addOrConditionToAttribute(currentEl, 'ng-disabled', tAttrs.coIndicateSaving);
            });

            tElem.prepend([
                '<span data-us-spinner="saveIndicationSpinnerOpts" ',
                    'spinner-key="' + spinnerKeyPrefix + tElem.attr('name') + '">',
                '</span>'
            ].join(''));

            return function(scope, elem, attrs) {
                scope.saveIndicationSpinnerOpts = {
                    className: 'us-spinner',
                    lines: 11, length: 4, width: 2, radius: 4,
                    top: '50px', left: '90%',
                    color: '#fff'
                };
                scope.$watch(attrs.coIndicateSaving, function(isSaving) {
                    if (isSaving) {
                        usSpinnerService.spin(spinnerKeyPrefix + elem.attr('name'));
                    } else {
                        usSpinnerService.stop(spinnerKeyPrefix + elem.attr('name'));
                    }
                });
            };
        }
    };
});
