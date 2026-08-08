/* 主入口：初始化各模組。
   各模組自行檢查所需 DOM 是否存在，缺了就靜默跳過。 */
import {initMirrorPuzzle} from './mirror-puzzle.js';
import {initTimeline}    from './timeline.js';
import {initCounter}     from './counter.js';

document.addEventListener('DOMContentLoaded',()=>{
  initMirrorPuzzle();
  initTimeline();
  initCounter();
});