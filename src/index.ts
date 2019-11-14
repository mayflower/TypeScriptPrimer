
    import { Setting } from './Setting';
    import { MatterDemo } from './MatterDemo';

    /*******************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        // set document title and acclaim debug console
        const title:string = ( Setting.APP_TITLE + ', ' + Setting.APP_COPYRIGHT );
        document.title = title;
        console.log( 'Welcome to [' + title + ']' );

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
