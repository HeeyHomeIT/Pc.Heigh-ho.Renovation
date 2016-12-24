<?php
/**
 * TODO 成本计算器接口
 * User: zhulr
 * Date: 2016/12/23
 * Time: 14:59
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CostCalculatorController extends Controller
{

    public function costCalculator()
    {
        $calculator_json = rq('calculator_json');
        $calculator_arr = json_decode($calculator_json, true);
        $callback = rq('callback');
        //基础信息
        $city = $calculator_arr['city'];
        $area = $calculator_arr['area'];
        $room_num = $calculator_arr['room_num'];
        $parlor_num = $calculator_arr['parlor_num'];
        $bathroom_num = $calculator_arr['bathroom_num'];
        $balcony_num = $calculator_arr['balcony_num'];
        //其他辅助信息
        $floor = $calculator_arr['floor'];
        $wall = $calculator_arr['wall'];
        $ground_sank = $calculator_arr['ground_sank'];
        //其他基础信息
        //房间分配 TODO 例：array('master'=>'1','second'=>'1','child'=>'1','parent'=>'0','cloakroom'=>'0','study'=>'0')
        $room_distribution = $calculator_arr['room_distribution'];
        if ($room_distribution['master'] != 0) {
            if (!$calculator_arr['master_distribution']) {
                $arr = array(
                    "code" => "200",
                    "msg" => "暂未开放此城市",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
            //房间内设计 TODO 例：array('ground'=>'smdb','wardrobe'=>'true','ceiling'=>'true','wallpaper'=>'false','window'=>'true')
            $master_distribution = $calculator_arr['master_distribution'];
            //地面处理方式 TODO 例：实木地板：smdb 强化复合地板：qhfhdb 瓷砖：cz
            $master_ground = $master_distribution['ground'];
            //衣柜制作方式 TODO 例：木工制作衣柜：true 自行购买衣柜：false
            $master_wardrobe = $master_distribution['wardrobe'];
            //木工制作吊顶 TODO 例：需要：true 不需要：false
            $master_ceiling = $master_distribution['ceiling'];
            //墙面铺设墙纸 TODO 例：需要：true 不需要：false
            $master_wallpaper = $master_distribution['wallpaper'];
            //有无飘窗结构 TODO 例：有飘窗：true 没有飘窗：false
            $master_window = $master_distribution['window'];
        }
        if ($room_distribution['second'] != 0) {
            $second_distribution = $calculator_arr['second_distribution'];
            $second_ground = $second_distribution['ground'];
            $second_wardrobe = $second_distribution['wardrobe'];
            $second_ceiling = $second_distribution['ceiling'];
            $second_wallpaper = $second_distribution['wallpaper'];
            $second_window = $second_distribution['window'];
        }
        if ($room_distribution['child'] != 0) {
            $child_distribution = $calculator_arr['child_distribution'];
            $child_ground = $child_distribution['ground'];
            $child_wardrobe = $child_distribution['wardrobe'];
            $child_ceiling = $child_distribution['ceiling'];
            $child_wallpaper = $child_distribution['wallpaper'];
            $child_window = $child_distribution['window'];
            //榻榻米的制作 TODO 例：木工制作榻榻米：true 自行购买榻榻米：false
            $child_tatami = $child_distribution['tatami'];
            //书桌书架选择 TODO 例：木工制作简易书桌书架：true 购买成品书桌书架：false
            $child_desk = $child_distribution['desk'];
        }
        if ($room_distribution['parent'] != 0) {
            $parent_distribution = $calculator_arr['parent_distribution'];
            $parent_ground = $parent_distribution['ground'];
            $parent_wardrobe = $parent_distribution['wardrobe'];
            $parent_ceiling = $parent_distribution['ceiling'];
            $parent_wallpaper = $parent_distribution['wallpaper'];
            $parent_window = $parent_distribution['window'];
        }
        if ($room_distribution['cloakroom'] != 0) {
            $cloakroom_distribution = $calculator_arr['cloakroom_distribution'];
            $cloakroom_ground = $cloakroom_distribution['ground'];
            $cloakroom_wardrobe = $cloakroom_distribution['wardrobe'];
            $cloakroom_ceiling = $cloakroom_distribution['ceiling'];
            $cloakroom_wallpaper = $cloakroom_distribution['wallpaper'];
            $cloakroom_window = $cloakroom_distribution['window'];
        }
        if ($room_distribution['study'] != 0) {
            $study_distribution = $calculator_arr['study_distribution'];
            $study_ground = $study_distribution['ground'];
            $study_ceiling = $study_distribution['ceiling'];
            $study_wallpaper = $study_distribution['wallpaper'];
            $study_window = $study_distribution['window'];
            $study_tatami = $study_distribution['tatami'];
            $study_desk = $study_distribution['desk'];
        }
        if ($area < 70 || $area > 160) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误，面积不在计算器计算范围",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if (!($city != null) && ($area != null) && ($room_num != null) && ($parlor_num != null) && ($bathroom_num != null) && ($balcony_num != null)) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        switch ($city) {
            case "苏州市" :
                $arr = array(
                    "code" => "000",
                    "msg" => "计算成功",
                    "data" => costCalculator_suzhou($area, $room_num, $parlor_num, $bathroom_num, $balcony_num)
                );
                return $callback . "(" . HHJson($arr) . ")";
                break;
            default :
                $arr = array(
                    "code" => "200",
                    "msg" => "暂未开放此城市",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }

}