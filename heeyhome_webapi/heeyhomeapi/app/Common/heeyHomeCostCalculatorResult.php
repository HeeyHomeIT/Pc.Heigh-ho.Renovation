<?php
/**
 * TODO 成本计算器返回结果计算
 * User: heeyhome
 * Date: 2016/12/23
 * Time: 15:36
 */
use Illuminate\Support\Facades\DB;

function L1($d1)
{
    return (2 - $d1) * 9.5;
}

//水电人工
function sdrg($a)
{
    return $a * 40;
}

//瓦工人工
function wgrg($flag, $b1, $d1, $h1, $parlor_ground)
{
    if ($parlor_ground == 'cz') {
        $kt = 1;
    } else {
        $kt = 0;
    }
    if ($parlor_ground == 'cz') {
        $yt = 1;
    } else {
        $yt = 0;
    }
    if ($parlor_ground == 'cz') {
        $cf = 1;
    } else {
        $cf = 0;
    }
    //TODO 瓦工需要添加瓷砖属性
    switch ($flag) {
        case 1:
            //基础
            $J1 = $b1 * 0.83;
            $L1 = (2 - $d1) * 9.5;
            $B5 = 14 + $L1 / 9.5 * 1.5;
            $D5 = ($d1 - 1) * 9.5;
            $F5 = 0;
            $H5 = 5.6 + $L1 / 9.5;
            $J5 = 4.5 + $L1 / 9.5 * 1.5;
            $B6 = 0;
            $D6 = 4.8 + $L1 / 9.5 * 0.5;
            $F6 = ($h1 - 1) * 3;
            $H6 = $J1 - $B5 - $D5 - $H5 - $J5 - $D6 - $F6 - $F5;
            //厨房瓦工贴瓷砖人工
            $D18 = (($H5 / 2 + 2) * 4.8 + $H5 - 3) * 40 * $cf;
            //厨房落水管封砌人工
            $F18 = 150;
            //厨房瓦工做防水
            $H18 = 0;
            //卫生间瓦工人工费
            $B21 = (($J5 / 1.8 + 1.8) * 4.8 + $J5) * 40;
            //卫生间瓦工做防水
            $D21 = ((4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) + 9) * 15;
            //卫生间落水管封砌人工
            $F21 = 150;
            //客餐厅瓦工人工费
            $B33 = $H6 * 40 * $kt;
            //客餐厅瓦工补电线槽人工
            $D33 = 200;
            //客餐厅瓦工砌墙人工
            $F33 = 10 * 50;
            //阳台瓦工瓷砖人工
            $B37 = (($D6 / 3.2 * 2 + 6.4) * 2.7 - 4.8 - 4 + $D6) * 40 * $yt;
            //阳台瓦工封砌水管
            $D37 = 150;
            //阳台瓦工做防水
            $F37 = 150;
            //第二个阳台
            $B40 = abs(1 - $h1) * (($F6 / 2 * 2 + 4) * 2.7 + $F6 - 5) * 40;
            $D40 = (abs(1 - $h1)) * 150;
            $F40 = (abs(1 - $h1)) * 100;
            return $D18 + $F18 + $H18 + $B21 + $D21 + $F21 + $B33 + $D33 + $F33 + $B37 + $D37 + $F37 + ($B40 + $D40 + $F40);
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

//木工人工
function mgrg($flag, $b1, $d1, $h1, $kitchen_cupboard, $master_wardrobe, $second_wardrobe, $master_ceiling, $second_ceiling, $parlor_ceiling, $parlor_shoebox, $parlor_wine_cabinet, $balcony_hanging_cabinet)
{
    //橱柜
    $cg = isset($kitchen_cupboard) ? 1 : 0;
    //衣柜1
    $yg1 = isset($master_wardrobe) ? 1 : 0;
    //衣柜2
    $yg2 = isset($second_wardrobe) ? 1 : 0;
    //吊顶1
    $dd1 = isset($master_ceiling) ? 1 : 0;
    //吊顶2
    $dd2 = isset($second_ceiling) ? 1 : 0;
    //客餐厅吊顶
    $dd3 = isset($parlor_ceiling) ? 1 : 0;
    //背景基层
    $bj = 1;
    //鞋柜
    $xg = isset($parlor_shoebox) ? 1 : 0;
    //酒柜
    $jg = isset($parlor_wine_cabinet) ? 1 : 0;
    //阳台吊柜
    $dg = isset($balcony_hanging_cabinet) ? 1 : 0;

    switch ($flag) {
        case 1:
            //基础
            $J1 = $b1 * 0.83;
            $L1 = (2 - $d1) * 9.5;
            $B5 = 14 + $L1 / 9.5 * 1.5;
            $D5 = ($d1 - 1) * 9.5;
            $F5 = 0;
            $H5 = 5.6 + $L1 / 9.5;
            $J5 = 4.5 + $L1 / 9.5 * 1.5;
            $B6 = 0;
            $D6 = 4.8 + $L1 / 9.5 * 0.5;
            $F6 = ($h1 - 1) * 3;
            $H6 = $J1 - $B5 - $D5 - $H5 - $J5 - $D6 - $F6 - $F5;

            //厨房橱柜
            $B17 = 806 * $cg;
            //主卧衣柜
            $B30 = 825 * $yg1;
            //主卧吊顶
            $D30 = (((14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) / 3.2 + 3.2) * 2 * 0.7 * 40 + 150) * $dd1;
            //次卧衣柜
            $D25 = 825 * $yg2;
            //次卧吊顶
            $D26 = ((abs(1 - $d1)) * (((($d1 - 1) * 9.5) / 3 + 3) * 2 * 0.7 * 40 + 150)) * $dd2;
            //阳台吊柜
            $H37 = (1.5 * 130 + 40 * 3) * $dg;
            //客餐厅吊顶
            $H33 = (($H6 / 3.6 * 2 + 3.6 * 2) * 0.8 * 40 + 150) * $dd3;
            //客餐厅背景基层
            $J33 = 300 * $bj;
            //客餐厅鞋柜
            $B34 = 350 * $xg;
            //客餐厅酒柜
            $D34 = 600 * $jg;
            return $B17 + $B30 + $D30 + $D25 + $D26 + $H37 + $H33 + $J33 + $B34 + $D34;
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

//油漆工人工
function yqgrg($flag, $b1, $d1)
{
    switch ($flag) {
        case 1:
            //基础
            $J1 = $b1 * 0.83;
            $L1 = (2 - $d1) * 9.5;
            $H5 = 5.6 + $L1 / 9.5;
            $J5 = 4.5 + $L1 / 9.5 * 1.5;

            $B43 = ($J1 - $H5 - $J5) * 3 * 23;
            return $B43;
        case 2:

            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

//杂工人工
function zgrg($flag, $b1, $d1, $h1)
{
    switch ($flag) {
        case 1:
            $B11 = (($b1 * 0.83) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5)) * 9 + ((4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5) + (($h1 - 1) * 3)) * 2.5 * 15;
            $D11 = 600;
            $F11 = 200;
            $H11 = 600;
            $J11 = $b1 * 4.5;
            return $B11 + $D11 + $F11 + $H11 + $J11;
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

//中端水电材料
function zdsdcl($flag, $b1)
{
    switch ($flag) {
        case 1:
            $E14 = 27 * $b1;
            return $E14 + 100;
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

//高端水电材料
function gdsdcl($flag, $b1)
{
    switch ($flag) {
        case 1:
            $E14 = 27 * $b1;
            return $E14 * 2.3 + 100;
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

//瓦工辅材
function wgfc($flag, $b1, $d1, $f1, $h1)
{
    switch ($flag) {
        case 1:
            $F43 = (((((5.6 + ((2 - $d1) * 9.5) / 9.5) / 2 + 2) * 4.8 - 3) * 0.4 + (((4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) / 1.8 + 1.8) * 4.8) * 0.4 + (((4.8 + (((2 - $d1) * 9.5)) / 9.5 * 0.5) / 3.2 * 2 + 6.4) * 2.7 - 4.8 - 4) * 0.4 + (((($h1 - 1) * 3) / 1.5 + 1.5) * 5.4 - 2) * 0.4 * (($h1 - 1) * 3) / 3 + ((5.6 + ((2 - $d1) * 9.5) / 9.5) + (4.5 + (5.6 + ((2 - $d1) * 9.5) / 9.5 * 1.5) + (($b1 * 0.83) - (14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (($d1 - 1) * 9.5) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5) - (($h1 - 1) * 3) - 0) + (($h1 - 1) * 3) + (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5))) * 0.3) * 20) + ((((5.6 + ((2 - $d1) * 9.5) / 9.5) + (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) + (4.8 + (((2 - $d1) * 9.5)) / 9.5 * 0.5) + (($h1 - 1) * 3) + (($b1 * 0.83) - (14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (($d1 - 1) * 9.5) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5) - (($h1 - 1) * 3) - 0)) * 1.2) * 6) + (((4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) * 1.8) * 20) + (((4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) * 7.2) * 6) + 150 * ($h1 + $f1) + 75 * ($f1 + $h1 + 1) + 100 + 100 + 100;
            $F58 = (((5.6 + ((2 - $d1) * 9.5) / 9.5) + (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) + (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5) + (($h1 - 1) * 3) + (($b1 * 0.83) - (14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (($d1 - 1) * 9.5) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5) - (($h1 - 1) * 3) - 0)) * 1.2 + (((((5.6 + ((2 - $d1) * 9.5) / 9.5) / 2 + 2) * 4.8 - 3) * 0.4 + (((4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) / 1.8 + 1.8) * 4.8) * 0.4 + (((4.8 + (((2 - $d1) * 9.5)) / 9.5 * 0.5) / 3.2 * 2 + 6.4) * 2.7 - 4.8 - 4) * 0.4 + (((($h1 - 1) * 3) / 1.5 + 1.5) * 5.4 - 2) * 0.4 * (($h1 - 1) * 3) / 3 + ((5.6 + ((2 - $d1) * 9.5) / 9.5) + (4.5 + (5.6 + ((2 - $d1) * 9.5) / 9.5 * 1.5) + (($b1 * 0.83) - (14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (($d1 - 1) * 9.5) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5) - (($h1 - 1) * 3) - 0) + (($h1 - 1) * 3) + (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5))) * 0.3))) * 1.6;
            return $F43 + 100 + $F58;
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

//木工辅材
function mgfc($flag, $b1, $d1, $h1)
{
    switch ($flag) {
        case 1:
            $L53 = ((((($d1 - 1) * 9.5) / 3 + 3) * 2 * 0.7 + ((14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) / 3.2 + 3.2) * 2 * 0.7 + ((($b1 * 0.83) - (14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (($d1 - 1) * 9.5) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5) - (($h1 - 1) * 3) - 0) / 3.6 * 2 + 3.6 * 2) * 0.8) / 1.2 / 2.4 * (1 + 1 / 6));
            $L54 = (((($d1 - 1) * 9.5 / 3 + 3) * 2 + ((14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) / 3.2 + 3.2) * 2) / 3.3 * 4.4 + ((($b1 * 0.83) - (14 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (($d1 - 1) * 9.5) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - (4.8 + ((2 - $d1) * 9.5) / 9.5 * 0.5) - (($h1 - 1) * 3) - 0) / 3.6 * 2 + 3.6 * 2) / 2.5 * 3.3 + 5);
            $I43 = ($L53 * 26) + ($L54 * 7) + 300;
            return $I43 + $L53 * 3 + $L54 / 5 * 3 + 100;
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

//油漆材料
function yqcl($flag, $b1, $d1, $h1)
{
    switch ($flag) {
        case 1:
            $N58 = ((($b1 * 0.83) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - 0) * 3 / 8) * 28;
            $N59 = ((($b1 * 0.83) - (5.6 + ((2 - $d1) * 9.5) / 9.5) - (4.5 + ((2 - $d1) * 9.5) / 9.5 * 1.5) - 0) * 3 / 9) * 45;
            $N60 = 3 * 45;
            $N61 = 1;
            $N62 = 150;
            return $N58 + $N59 + $N60 + $N61 + $N62 + 100;
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
        default:
            return;
    }
}

function czdd()
{
}

function czgd()
{
}

function bc()
{
}

function dls()
{
}

function db()
{
}

function mm()
{
}

function cfym()
{
}

function lyfym()
{
}

function ygym()
{
}

function jcdd()
{
}

function cgsys()
{
}