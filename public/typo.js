var TYPO_FOUND_CONF = {
    MAX_SELECTION_LENGTH: 127
    ,TOO_LONG_SELECTION_MSG: "You've selected too much text!"
    ,THX_MESSAGE: 'Thank you for your help!'
    ,AJAX_URL: '/typofound/'
};

var TypoFound = {
    
    init: function()
    {
        var that = this;
        window.document.onkeypress = function(e){
            if (that.checkEvent(e))
            {
                var str = new String( that.getSelection() ).toString();
                if(str.length > 0)
                    if (str.length > TYPO_FOUND_CONF.MAX_SELECTION_LENGTH)
                    {
                        alert(TYPO_FOUND_CONF.TOO_LONG_SELECTION_MSG);
                        return;
                    }
                    else
                    {
                        $.post(TYPO_FOUND_CONF.AJAX_URL, {
                            str: str
                            ,url: window.location.href
                        });
                        alert(TYPO_FOUND_CONF.THX_MESSAGE);
                    }
                return false;
            }
        };
    }

    ,getSelection: function()
    {
        try{
            return window.getSelection ?
                window.getSelection()
                : ( window.document.getSelection ?
                    window.document.getSelection()
                    : window.document.selection.createRange().text
                );
        } catch(e) {
            return null;
        }
    }
    
    ,checkEvent: function(e)
    {
        return window.event ?
            (window.event.keyCode == 10 || (window.event.keyCode == 13 && window.event.ctrlKey))
            : ( e ?
                ((e.which == 10 && e.modifiers == 2) || (e.keyCode == 0 && e.charCode == 106 && e.ctrlKey) || (e.keyCode == 13 && e.ctrlKey))
                : false
            );
    }
};

TypoFound.init();