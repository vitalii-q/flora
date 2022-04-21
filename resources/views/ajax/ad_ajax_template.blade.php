<?
if(!isset($url)) { $url = $teaser ? '/'.$teaser->url : ''; }
if(!isset($image)) { $image = $teaser ? ($teaser->image ? $teaser->image->image : '') : ''; }
if(!isset($h1)) { $h1 = $teaser ? $teaser->name : ''; }
?>

<?
$result_1 = str_replace('<?php echo $url;?>', $url, $template->template);
$result_2 = str_replace('<?php echo $img;?>', $image, $result_1);
$result = str_replace('<?php echo $h1;?>', $h1, $result_2);

//echo $teaser->image->image;
//echo $teaser->name;


echo $result;?>

<style>
<? echo $template->style; ?>
</style>

<br>
<div class="block block-bordered">
    <div class="block-header block-header-default" style="padding-top: 3px;padding-bottom: 3px;">
        <h3 class="block-title">Ссылка</h3>
    </div>
    <div class="block-content">
        <p style="margin-bottom: 9px; margin-top: -10px;"><?= $url ?></p>
    </div>
</div>
<div class="block block-bordered">
    <div class="block-header block-header-default" style="padding-top: 3px;padding-bottom: 3px;">
        <h3 class="block-title">Html</h3>
    </div>
    <div class="block-content">
{{--        <p><? echo htmlspecialchars(str_replace('>', '><br>', $template->template)); ?></p>--}}
        <p><?
            $templateExp = explode('">', $template->template);

            $y = 1; foreach ($templateExp as $tempExp) {
                if($y != count($templateExp)) {
                    echo htmlspecialchars($tempExp.'">');
                } else {
                    echo htmlspecialchars($tempExp);
                }

                echo '<br><div style="height: 10px;"></div>';
                $y++;
            }

            //echo htmlspecialchars(str_replace('>', '><br>', $template->template)); ?>
        </p>
        <style>.block-content p {margin-bottom: 0px}</style>
    </div>
</div>
<div class="block block-bordered">
    <div class="block-header block-header-default" style="padding-top: 3px;padding-bottom: 3px;">
        <h3 class="block-title">Css</h3>
    </div>
    <div class="block-content">
        <p><?
            $stylesExp = explode('}', $template->style);

            $u = 1; foreach ($stylesExp as $styleExp) {
                if($u != count($stylesExp)) {
                    echo htmlspecialchars($styleExp.'}');
                    echo '<br><div style="height: 10px;"></div>';
                } else {
                    echo htmlspecialchars($styleExp);
                }
            $u++;}?>
        </p>
    </div>
</div>
