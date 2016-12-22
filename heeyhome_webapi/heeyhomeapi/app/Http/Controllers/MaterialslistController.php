<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/16
 * Time: 12:30
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MaterialslistController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $order_id=rq('order_id');
        $elematerialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=1');
        $material_ids=DB::select('select material_id from hh_order_material where order_id=? and material_type=?',[$order_id,1]);
        //dd($num);
        foreach($elematerialist as $key=>$value) {
            $spec = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
            if ($spec) {
                foreach ($spec as $k => $v) {
                    $ids = DB::select('select id from hh_materials where spec_id=?', [$v->spec_id]);
                    if ($ids) {
                        $spec[$k]->id = $ids[0]->id;
                        $spec[$k]->num = 0;
                        if ($material_ids) {
                            $num = DB::select('select material_num,material_name_id from hh_order_material_list where material_id=?', [$material_ids[0]->material_id]);
                            foreach ($num as $ke => $item) {
                                if ($ids[0]->id == $item->material_name_id) {
                                    $spec[$k]->num = $num[$ke]->material_num;
                                }
                            }
                        }
                    }
                }
                $elematerialist[$key]->spec = $spec;
            }
        }
        $material_ids=DB::select('select material_id from hh_order_material where order_id=? and material_type=?',[$order_id,2]);
        $brickmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=2');
        foreach($brickmaterialist as $key=>$value){
            $spec=DB::select('select spec_id,spec_name from hh_material_spec where material_id=?',[$value->material_id]);
            if($spec) {
                foreach ($spec as $k => $v) {
                    $ids = DB::select('select id from hh_materials where spec_id=?', [$v->spec_id]);
                    if ($ids) {
                        $spec[$k]->id = $ids[0]->id;
                        $spec[$k]->num = 0;
                        if ($material_ids) {
                            $num = DB::select('select material_num,material_name_id from hh_order_material_list where material_id=?', [$material_ids[0]->material_id]);
                            foreach ($num as $ke => $item) {
                                if ($ids[0]->id == $item->material_name_id) {
                                    $spec[$k]->num = $num[$ke]->material_num;
                                }
                            }
                        }
                    }
                }
                $brickmaterialist[$key]->spec = $spec;
            }
        }
        $material_ids=DB::select('select material_id from hh_order_material where order_id=? and material_type=?',[$order_id,3]);
        $woodmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=3');
        foreach($woodmaterialist as $key=>$value){
            $spec=DB::select('select spec_id,spec_name from hh_material_spec where material_id=?',[$value->material_id]);
            if($spec) {
                foreach ($spec as $k => $v) {
                    $ids = DB::select('select id from hh_materials where spec_id=?', [$v->spec_id]);
                    if ($ids) {
                        $spec[$k]->id = $ids[0]->id;
                        $spec[$k]->num = 0;
                        if ($material_ids) {
                            $num = DB::select('select material_num,material_name_id from hh_order_material_list where material_id=?', [$material_ids[0]->material_id]);
                            foreach ($num as $ke => $item) {
                                if ($ids[0]->id == $item->material_name_id) {
                                    $spec[$k]->num = $num[$ke]->material_num;
                                }
                            }
                        }
                    }
                }
                $woodmaterialist[$key]->spec = $spec;
            }
        }
        $material_ids=DB::select('select material_id from hh_order_material where order_id=? and material_type=?',[$order_id,4]);
        $paintmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=4');
        foreach($paintmaterialist as $key=>$value){
            $spec=DB::select('select spec_id,spec_name from hh_material_spec where material_id=?',[$value->material_id]);
            if($spec) {
                foreach ($spec as $k => $v) {
                    $ids = DB::select('select id from hh_materials where spec_id=?', [$v->spec_id]);
                    if ($ids) {
                        $spec[$k]->id = $ids[0]->id;
                        $spec[$k]->num = 0;
                        if ($material_ids) {
                            $num = DB::select('select material_num,material_name_id from hh_order_material_list where material_id=?', [$material_ids[0]->material_id]);
                            foreach ($num as $ke => $item) {
                                if ($ids[0]->id == $item->material_name_id) {
                                    $spec[$k]->num = $num[$ke]->material_num;
                                }
                            }
                        }
                    }
                }
                $paintmaterialist[$key]->spec = $spec;
            }
        }
        $arr = array("code" => "000",
            "data" => array("ele"=>$elematerialist,
                        "brick"=>$brickmaterialist,
                        "wood"=>$woodmaterialist,
                        "paint"=>$paintmaterialist
                )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
}