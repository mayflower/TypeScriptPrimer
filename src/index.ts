
    import { Setting    } from './Setting';
    import { MatterDemo } from './MatterDemo';

    /*******************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *
    *   TODO Sharpen all images!
    *   TODO prune package.json.
    *   TODO complete creator functions.
    *   TODO Function for creation of bodies!
    *   TODO enum for body types etc.
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        // set document title and acclaim debug console
        document.title = ( Setting.APP_TITLE + ', ' + Setting.APP_COPYRIGHT );
        console.log( 'Welcome to [' + Setting.APP_TITLE + ']' );

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
