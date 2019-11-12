
    import * as Matter from 'matter-js';
    import { Example } from './Demo';

    /*******************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        // set the document title and acclaim the debug console
        document.title = 'TypeScriptPrimer';
        console.log( 'Start catapult demo' );

        // launch the Catapult demo
        Example.catapult();
    };

    /*******************************************************************************************************************
    *   Being invoked when the page is left.
    *******************************************************************************************************************/
    window.onunload = () : void  =>
    {
    };
