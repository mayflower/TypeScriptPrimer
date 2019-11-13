
    import { MatterDemo } from './MatterDemo';

    /*******************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        // set the document title and acclaim the debug console
        document.title = 'TypeScriptPrimer';
        console.log( 'Start start demo' );

        // create and launch the Catapult demo
        const main:MatterDemo = new MatterDemo();
        main.start();
    };

    /*******************************************************************************************************************
    *   Being invoked when the page is left.
    *******************************************************************************************************************/
    window.onunload = () : void  =>
    {
    };
