/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
 function injectScript(file_path, tag) {
    let node = document.getElementsByTagName(tag)[0];
    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
};

if (window.location.href.includes("moomoo.io")) {
    let removals = 0;
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeName == "SCRIPT") {
                    if (node.src.includes("/bundle.js") || /(cookiepro.com)/.exec(node.src)) {
                        removals++;
                        //console.log('murdering');
                        try {
                            node.parentNode.removeChild(node);
                            //console.log('method 1');
                        } catch(e) {
                            node.remove();
                            //console.log('method 2');
                        };
                        //removals == 2 && (observer.disconnect());
                    };
                };
            });
        });
    });
    observer.observe(document, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
    });
};

injectScript(chrome.runtime.getURL('modules/script.js'), 'body');