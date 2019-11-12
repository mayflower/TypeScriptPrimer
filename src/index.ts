
    import { Main } from './Main';

    /*******************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        // set the document title and acclaim the debug console
        document.title = 'TypeScriptPrimer';
        console.log( 'Start run demo' );

        // create and launch the Catapult demo
        const main:Main = new Main();
        main.run();
    };

    /*******************************************************************************************************************
    *   Being invoked when the page is left.
    *******************************************************************************************************************/
    window.onunload = () : void  =>
    {
    };
