import Test from './test';
import Play from './play';
import Skip from './skip';
import ShowQueue from './showQueue';
import RemoveAt from './removeAt';
import Clear from './clear';
import Leave from './leave';
import Loop from './loop'
import Random from './random';
import OOO from './ooo';
import Help from './help';

export default {
    TestCommand: new Test(),
    PlayCommand: new Play(),
    SkipCommand: new Skip(),
    ShowQueueCommand: new ShowQueue(),
    RemoveAtCommand: new RemoveAt(),
    ClearCommand: new Clear(),
    LeaveCommand: new Leave(),
    LoopCommand: new Loop(),
    RandomCommand: new Random(),
    OOOCommand: new OOO(),
    HelpCommand: new Help(), 
}